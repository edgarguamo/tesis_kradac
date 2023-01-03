
# Caracteres especiales que se eliminaran de los comentarios
from string import punctuation  
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
import export_doc
import pandas as pd
import numpy as np
import vectorizer
from sklearn.feature_extraction.text import CountVectorizer

vector=vectorizer.vectorizer_sentences()

def train_analyzer(train_text, test_text, train_labels, test_labels, sentences):
  train_X = vector.fit_transform(train_text)
  
  df = pd.DataFrame(data=train_X.toarray(),columns = vector.get_feature_names_out(),)

  classifier = LinearSVC(C=4.0, class_weight=None, dual=False, fit_intercept=True,             
          intercept_scaling=1, loss='squared_hinge', max_iter=3000,
          multi_class='ovr', penalty='l1', random_state=None, tol=0.1,
          verbose=1)

  classifier.fit(train_X, train_labels)
  '''
  predicciones_test = classifier.predict(test_X)
  accuracy = accuracy_score(test_labels, predicciones_test)
  '''
  comentarios_calificados = vector.transform(sentences) 
  predicciones = classifier.predict(comentarios_calificados)


  lista_final_SVC_cliente = []
  for text, label in zip(comentarios_calificados, predicciones):
      diccionario = {"pola": label, "texto": text}
      lista_final_SVC_cliente.append(diccionario)
  data_SVC_cliente = pd.DataFrame.from_records(lista_final_SVC_cliente)

  df_predicciones = pd.DataFrame(predicciones, columns=['predicciones'])

  df_predicciones.loc[df_predicciones.predicciones == 0, 'predicciones'] = 'Negativo'
  df_predicciones.loc[df_predicciones.predicciones == 1, 'predicciones'] = 'Neutral'
  df_predicciones.loc[df_predicciones.predicciones == 2, 'predicciones'] =  'Positivo'
  return df_predicciones
  '''
  print(f"Accuracy: {accuracy:.4%}")
  precision = precision_score(test_labels, predicciones_test,   
                              average='weighted')
  print(f"Precision Score: {precision:.4%}")
  '''