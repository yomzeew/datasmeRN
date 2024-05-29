import * as SQLite from 'expo-sqlite';
import { db } from './database';

const generateDeviceId = () => {
  const timestamp = Date.now().toString(16); // Convert current timestamp to hexadecimal
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
  return `${timestamp}-${randomString}`; // Combine timestamp and random string
};

export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS devicetable (id INTEGER PRIMARY KEY AUTOINCREMENT, deviceid VARCHAR(50) NOT NULL);',
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
          'DROP TABLE devicetable',
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
export const CreateTableAndSelectID = async() => {
  const deviceid = generateDeviceId();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM devicetable;',
          [],
          (_, { rows }) => {
            const itemsArray = rows._array;
            if (itemsArray.length > 0) {
              resolve(itemsArray[0].deviceid);
            } else {
              db.transaction(txselect => {
                txselect.executeSql(
                  'INSERT INTO devicetable (deviceid) VALUES (?);',
                  [deviceid],
                  (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                      resolve(deviceid);
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

export const SelectID = async() => {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM devicetable;',
            [],
            (_, { rows }) => {
              const itemsArray = rows._array;
              if (itemsArray.length>0){
                resolve('oldid')
              }
              else if(itemsArray.length===0){
                resolve('newid')
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
