import db_conection
import pandas as pd
import export_doc
from sklearn.model_selection import train_test_split
import client_analyzer
import driver_analyzer

client = db_conection.db_conect()
mydb = client["tesis"]
comments_db  = client['test']
col_client = mydb["muestra_cliente"]
col_driver = mydb["muestra_conductor"]
new_comments = comments_db["filedatas"]
data = pd.read_csv('./datos/usuarios_totales5.csv', delimiter=',', encoding='utf-8')


def train(): 
    json_client = col_client.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    json_driver = col_driver.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    muestra_clientes = pd.DataFrame(json_client)
    muestra_conductores = pd.DataFrame(json_driver)
    #muestra_clientes.ComentarioCliente = muestra_clientes.ComentarioCliente.replace('-','', regex=True)
    '''
    muestra_clientes.observacion = muestra_clientes.observacion.replace('-','', regex=True)
    muestra_clientes = muestra_clientes.dropna(subset=["observacion"])
    muestra_clientes = muestra_clientes.replace('', ' ')
    indexSpaceConductor= muestra_clientes[muestra_clientes['observacion'].str.isspace()].index
    muestra_clientes = muestra_clientes.drop(indexSpaceConductor,axis=0)
    muestra_clientes.index = range(muestra_clientes.shape[0])


    
    muestra_conductores .observacion = muestra_conductores.observacion.replace('-','', regex=True)
    muestra_conductores = muestra_conductores.dropna(subset=["observacion"])
    muestra_conductores = muestra_conductores.replace('', ' ')
    indexSpaceConductor= muestra_conductores[muestra_conductores['observacion'].str.isspace()].index
    muestra_conductores = muestra_conductores.drop(indexSpaceConductor,axis=0)
    muestra_conductores.index = range(muestra_conductores.shape[0])
    '''


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
    export_doc.export_json()

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
    print(data)
    

    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_clientes['comentario'],
                                                                        muestra_clientes['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_clientes['equivalente'],
                                                                        random_state=1)
    data_clientes = data['observacion'].values.tolist()
    print(data_clientes)
    predicciones_clientes = client_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_clientes)
    resultados = pd.concat([data, predicciones_clientes], axis=1)
    resultados['ComentarioConductor']='Neutral'
    print(resultados)
    resultados.to_csv('resultados.csv', index=False, encoding='utf-8')
    resultados.to_json("./datos/resultados.json", orient = "records",force_ascii=False,)
    export_doc.export_json()
    #delete_collection