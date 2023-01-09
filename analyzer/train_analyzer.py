import db_conection
import pandas as pd
import export_doc
from sklearn.model_selection import train_test_split
import client_analyzer
import driver_analyzer

client = db_conection.db_conect()
mydb = client["tesis"]
col_client = mydb["muestra_cliente"]
col_driver = mydb["muestra_conductor"]
data = pd.read_csv('./datos/test_muestra.csv', delimiter=',', encoding='utf-8')


def train(): 
    json_client = col_client.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    muestra_clientes = pd.DataFrame(json_client)
    json_driver = col_driver.find({}, {"_id": 0,"comentario":1, "equivalente":1})
    muestra_conductores = pd.DataFrame(json_driver)

    '''
    docs = pd.DataFrame(json_data)
    print(docs)
    '''
    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_clientes['comentario'],
                                                                        muestra_clientes['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_clientes['equivalente'],
                                                                        random_state=1)
    data_clientes = data['ComentarioCliente'].values.tolist()
    predicciones_clientes = client_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_clientes)
    #predicciones_clientes.columns = ['CalificacionClientes']

    train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_conductores['comentario'],
                                                                        muestra_conductores['equivalente'],
                                                                        test_size = 0.15,
                                                                        stratify = muestra_conductores['equivalente'],
                                                                        random_state=1)
    data_conductores = data['ComentarioConductor'].values.tolist()  
    predicciones_conductores = driver_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_conductores)
    #predicciones_clientes.columns = ['CalificacionChoferes']

    print(predicciones_conductores)
    resultados = pd.concat([data, predicciones_clientes, predicciones_conductores], axis=1)
    print(resultados)
    resultados.to_csv('resultados.csv', index=False, encoding='utf-8')
    resultados.to_json("./datos/resultados.json", orient = "records",force_ascii=False,)
    export_doc.export_json()
