
import pandas as pd
from sklearn.model_selection import train_test_split
import client_analyzer
import driver_analyzer
import export_doc

data = pd.read_csv('./datos/usuarios_totales.csv', delimiter=',', encoding='utf-8')
muestra_clientes = pd.read_csv('./datos/muestra_clientes.csv', delimiter=',', encoding='utf-8')
muestra_conductores = pd.read_csv('./datos/muestra_conductores.csv', delimiter=',', encoding='utf-8')


train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_clientes['comentario'],
                                                                      muestra_clientes['equivalente'],
                                                                      test_size = 0.15,
                                                                      stratify = muestra_clientes['equivalente'],
                                                                      random_state=1)
data_clientes = data['observacion'].values.tolist()
predicciones_clientes = client_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_clientes)
predicciones_clientes.columns = ['prediccion_cliente']

train_text,  test_text, train_labels, test_labels  = train_test_split(muestra_conductores['comentario'],
                                                                      muestra_conductores['equivalente'],
                                                                      test_size = 0.15,
                                                                      stratify = muestra_conductores['equivalente'],
                                                                      random_state=1)
data_conductores = data['observacion_conductor'].values.tolist()  
predicciones_conductores = driver_analyzer.train_analyzer(train_text, test_text, train_labels, test_labels, data_conductores)
predicciones_clientes.columns = ['prediccion_conductor']

print(predicciones_conductores)
resultados = pd.concat([data, predicciones_clientes, predicciones_conductores], axis=1)
print(resultados)
resultados.to_json("./datos/resultados.json", orient = "records",force_ascii=False,)
export_doc.export_json()

