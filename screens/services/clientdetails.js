import * as SQLite from 'expo-sqlite';
import { db } from './database';

export const clientTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS clientdetails (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(250) NOT NULL, username VARCHAR(250) NOT NULL);',
        [],
        () => {
          console.log('Table created')
        },
        error => {
          console.error('Error creating table:', error);
          reject(error);
        }
      );
    });
  });
};
export const DropTable=()=>{
    
    db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE clientdetails',
          [],
          (_, result) => {
            console.log('Table created drop!');
          },
          (_, error) => {
            console.log('Error creating table:', error);
          }
        );
      });

}
export const CreateTableAndSelectID = async(email,username) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM clientdetails;',
          [],
          (_, { rows }) => {
            const itemsArray = rows._array;
            if (itemsArray.length > 0) {
              resolve(itemsArray[0].email);
            } else {
              db.transaction(txselect => {
                txselect.executeSql(
                  'INSERT INTO clientdetails (email,username) VALUES (?,?);',
                  [email,username],
                  (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                      resolve(email);
                    } else {
                      reject(new Error('Failed to add device ID'));
                    }
                  }
                );
              });
            }
          },
          error => {
            console.error('Error selecting device ID:', error);
            reject(error);
          }
        );
      });
    });
};

