import pandas as pd
import string
import joblib
import nltk

from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

nltk.download('stopwords')

# =========================
# CLEAN TEXT FUNCTION
# =========================
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = text.split()
    words = [w for w in words if w not in stopwords.words('english')]
    return " ".join(words)


# =========================
# LOAD DATASET
# =========================
print("Loading dataset...")

data = pd.read_csv("data/college_faq.csv")

print("Dataset loaded successfully")
print("Total rows:", len(data))
print("Intents:", data['intent'].unique())


# =========================
# CLEAN DATA
# =========================
data['cleaned'] = data['question'].apply(clean_text)


# =========================
# VECTORIZE
# =========================
vectorizer = TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True)
X = vectorizer.fit_transform(data['cleaned'])


# =========================
# TRAIN MODEL
# =========================
model = LogisticRegression(max_iter=1000, C=10, class_weight='balanced')
model.fit(X, data['intent'])


# =========================
# SAVE MODEL
# =========================
joblib.dump(model, "models/model.pkl")
joblib.dump(vectorizer, "models/vectorizer.pkl")

print("✅ Model trained successfully!")
print("Files saved in models/ folder")
