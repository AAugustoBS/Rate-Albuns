import sqlite3

class DatabaseManager:
    def __init__(self, db_path="./database/database.db"):
        """Inicializa a conexão com o banco de dados."""
        self.db_path = db_path
    #############----------Insertion----------#############
    def newUserDatabase(self,data):
        self.connect()
        self.insert('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', data)
        self.close()
        
        
    #############----------Check----------#############
    def checkUserDatabase(self,data):
        self.connect()
        result = self.fetch('SELECT * FROM Users WHERE email = ? or username = ?', data)
        self.close()
        return result 
    
    def getUserDatabase(self,email):
        self.connect()
        result = self.fetch('SELECT * FROM Users WHERE email = ?', (email,))
        self.close()
        return result[0] if result else None  
    #############----------Fetch----------#############
    def execute_script(self, sql_file_path):
        """Executa um script SQL a partir de um arquivo."""
        with open(sql_file_path, 'r') as sql_file:
            sql_script = sql_file.read()
        self.cursor.executescript(sql_script)
        self.conn.commit()

    def insert(self, query, params):
        """Insere um registro no banco de dados."""
        self.cursor.execute(query, params)
        self.conn.commit()

    def fetch(self, query, params=None):
        """Busca registros no banco de dados."""
        self.cursor.execute(query, params or ())
        return self.cursor.fetchall()

    def update(self, query, params):
        """Atualiza registros no banco de dados."""
        self.cursor.execute(query, params)
        self.conn.commit()

    def delete(self, query, params):
        """Deleta registros do banco de dados."""
        self.cursor.execute(query, params)
        self.conn.commit()


    def connect(self):
        try:
            self.conn = sqlite3.connect(self.db_path)
            self.cursor = self.conn.cursor()
            return True
        except sqlite3.Error as e:
            print(f"Error connecting to database: {e}")
            return False
    
    def close(self):
        """Fecha a conexão com o banco de dados."""
        self.conn.close()