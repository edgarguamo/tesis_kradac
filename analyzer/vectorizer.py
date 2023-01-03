from sklearn.feature_extraction.text import CountVectorizer
import string
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.data import load
from nltk.stem import SnowballStemmer
from string import punctuation
import csv
import nltk 
from nltk.stem import SnowballStemmer

nltk.download('stopwords')
nltk.download('vader_lexicon')
nltk.download('punkt')


#Características a eliminar
non_words = list(punctuation) # %$#@-\\
non_words.extend(['¿', '¡'])
non_words.extend(map(str,range(10)))


def stem_format(comment):
    comment = non_words_filtered(comment) # eliminación de caracteres especiales     
    stemmed_comment = []
    stemmer = SnowballStemmer('spanish')
    for word in comment:
      stemmed_comment.append(stemmer.stem(word)) # Limitar por cada palabra en el comentario
    return stemmed_comment


def non_words_filtered(comment):
    # Detección de los stopwords y eliminación de las mismas
    filtered_comnents=''.join([chr for chr in comment if chr not in non_words])
    # Dividir el comentario en las palabras que la componen
    tokens = nltk.word_tokenize(filtered_comnents)
    # Re estructuración del comentario
    return tokens

def vectorizer_sentences():
  vectorizer = CountVectorizer(tokenizer=stem_format, 
                                    lowercase=True,
                                    stop_words = stopwords.words('spanish'),
                                    token_pattern= "(?u)\b\w\w+\b",
                                    min_df=3,
                                    max_df=0.80,
                                    binary=False, 
                                    )
  return vectorizer