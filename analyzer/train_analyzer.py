import db_conection
import pandas as pd
import export_doc
from sklearn.model_selection import train_test_split
import client_analyzer
import driver_analyzer
import sys

client = db_conection.db_conect()
mydb = client["tesis"]
comments_db  = client['test']
col_client = mydb["muestra_cliente"]
col_driver = mydb["muestra_conductor"]
new_comments = comments_db["filedatas"]
data = pd.read_csv('/home/edgarf/Documentos/xtesis/tesis_kradac/analyzer/datos/usuarios_totales5.csv', delimiter=',', encoding='utf-8')


def train(): 
    json_client = col_client.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    json_driver = col_driver.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    muestra_clientes = pd.DataFrame(json_client)
    muestra_conductores = pd.DataFrame(json_driver)
    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_clientes['comentario'],
                                                                        muestra_clientes['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_clientes['equivalente'],
                                                                        random_state=1)
    data_clientes = data['ComentarioCliente'].values.tolist()
    predicciones_clientes = client_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_clientes)

    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_conductores['comentario'],
                                                                        muestra_conductores['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_conductores['equivalente'],
                                                                        random_state=1)
    data_conductores = data['ComentarioConductor'].values.tolist()  
    predicciones_conductores = driver_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_conductores)

    print(predicciones_conductores)
    resultados = pd.concat([data, predicciones_clientes, predicciones_conductores], axis=1)
    print(resultados)
    resultados.to_csv('resultados.csv', index=False, encoding='utf-8')
    resultados.to_json("./datos/resultados.json", orient = "records",force_ascii=False,)
    '''
    comentarios =resultados.to_dict('records')   
    export_doc.export_json(comentarios)
    '''

def analize_comments():
    json_client = col_client.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    muestra_clientes = pd.DataFrame(json_client)

    json_comments = new_comments.find({}, {"_id": 0,"id_usuario_atendio":1, "fecha_hora_registro":1, 
                                           "observacion":1, "observacion_conductor":1, "valoracion":1, 
                                           "valoracion_conductor":1})
    data = pd.DataFrame(json_comments)
    data.observacion = data.observacion.replace('-','', regex=True)
    data = data.dropna(subset=["observacion"])
    data = data.replace('', ' ')
    indexSpaceConductor= data[data['observacion'].str.isspace()].index
    data = data.drop(indexSpaceConductor,axis=0)
    data.index = range(data.shape[0])
    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_clientes['comentario'],
                                                                        muestra_clientes['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_clientes['equivalente'],
                                                                        random_state=1)
    data_clientes = data['observacion'].values.tolist()
    predicciones_clientes = client_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_clientes)
    resultados = pd.concat([data, predicciones_clientes], axis=1)
    resultados['ComentarioConductor']='Neutral'
    
    data =resultados.to_dict('records')   
    

    new_comments.drop() # Eliminación de colección comentarios_sin_calificar
    export_doc.export_json(data)

    cantidad_inicial = sys.stdin.readline()
    print ('De los ' + cantidad_inicial + ' comentarios cargados ' + str(resultados.shape[0]) 
           + ' no son archivos nulos/vacios por lo que se cargarón a la base de datos')
    sys.stdout.flush()