import { useState } from "react";
import { db } from "./database";
export const CreateTable=()=>{
    
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY NOT NULL,
                email VARCHAR(50) NOT NULL,
                password VARCHAR(50) NOT NULL,
                status BOOLEAN NOT NULL CHECK (status IN (0, 1))
            );
            `,
          [],
          (_, result) => {
            console.log('Table created successfully!');
          },
          (_, error) => {
            console.log('Error creating table:', error);
          }
        );
      });

}
export const DropTable=()=>{ 
    db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE user',
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
export const InsertSql = (email,password,statuspos) => {
    const returnmsgsuccess='Insert successful'
    const returnmsgexist='Already Exist'
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM user WHERE email=?',
            [email],
            (txObj,result)=>{
                if(result.rows.length<1){
                    tx.executeSql(
                        'INSERT INTO user (email,password,status) VALUES (?,?,?)',
                        [email,password,statuspos],
                        (_, result) => {
                          console.log('Insert successful!');
                          return returnmsgsuccess
                        },
                        (_, error) => {
                          console.log('Error inserting data:', error);
                        }
                      );
    
    
                }
                else{
                    return returnmsgexist
                }
    
            },
            (txObj, error) => {
                console.log('Error selecting data:', error);
              }

    
        )
    });
  }
  export const SelectSql = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM user',
          [],
          (_, result) => {
            console.log(`RECORD FOUND ${result.rows.length} records`);
  
            const data = [];
            console.log(data)
            for (let i = 0; i < result.rows.length; i++) {
              data.push(result.rows.item(i));
            }

           
            resolve(data);
           
          },
          (_, error) => {
            console.log('Error selecting data:', error);
            reject(error);
          }
        );
      });
    });
  };
  export const SelectSqlByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM user WHERE email=?',
          [email],
          (_, result) => {
            console.log(`RECORD FOUND ${result.rows.length} records`);
  
            const data = [];
            console.log(data)
            for (let i = 0; i < result.rows.length; i++) {
              data.push(result.rows.item(i));
            }

           
            resolve(data);
           
          },
          (_, error) => {
            console.log('Error selecting data:', error);
            reject(error);
          }
        );
      });
    });
  };
  export const UpdateSql=(email,statuspos)=>{
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE user SET status=? WHERE email=?',
          [email,statuspos],
          (txObj, result) => {
            console.log('Record updated successfully');
            return 'successful'
          },
          (txObj, error) => {
            console.log('Error updating record:', error);
            return 'failed'
          }
        );
      });

  }


