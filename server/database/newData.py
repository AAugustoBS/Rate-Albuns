import sqlite3
print("Creating database...")
def execute():
    # Conectar-se ao banco de dados (ou criar se não existir)
    conn = sqlite3.connect('database.db')

    # Criar um cursor para executar comandos SQL
    cursor = conn.cursor()


    with open('db.sql', 'r') as file:
        create_table_sql = file.read()
        cursor.executescript(create_table_sql)

    conn.commit()
    conn.close()
    print("Database created successfully!")

if __name__ == "__main__":
    execute()
    pass
    
   