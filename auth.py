import sys
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Aquí deberías usar una forma segura de manejar las credenciales
email = sys.argv[1]
password = sys.argv[2]

# Ruta al archivo de credenciales (ajusta la ruta según sea necesario)
CREDENTIALS_FILE = 'C:\Users\migda\Downloads\client_secret.json'

# Autenticación y construcción del cliente de Google Drive
credentials = service_account.Credentials.from_service_account_file(CREDENTIALS_FILE)
service = build('drive', 'v3', credentials=credentials)

# Función para listar archivos JSON en Google Drive
def list_json_files():
    query = "mimeType='application/json'"
    results = service.files().list(q=query, pageSize=10, fields="files(id, name)").execute()
    items = results.get('files', [])
    return items

if __name__ == "__main__":
    files = list_json_files()
    print(json.dumps(files))  # Imprime el resultado como JSON