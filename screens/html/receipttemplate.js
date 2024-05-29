export const htmlreceipt = (date, time, trx, amount, debit, statusone, beneficiary, descr) => {
    
  
    const html = `
      <div style="padding: 20px; border: solid #509DFF; border-radius: 12px; width: 100vw; display: flex; justify-content: center;">
        <div>
         
          <div style="height: 200px; width: 100%; background-color: #1E40AF; display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 100px; color: white;">DataSme</p>
          </div>
          <div>
            <h1 style="font-weight: bold; color: #1E40AF;">Transaction Details</h1>
          </div>
          <div style="margin-top: 0.75rem;">
            <p style="font-size: 30px;">Date: ${date}</p>
            <p style="font-size: 30px;">Time: ${time}</p>
            <p style="font-size: 30px;">Reference: ${trx}</p>
            <p style="font-size: 30px;">Amount: N${amount}</p>
            <p style="font-size: 30px;">Type: ${debit === 0 ? 'Credit' : 'Debit'}</p>
            <p style="font-size: 30px;">Status: ${statusone}</p>
          </div>
          <div style="margin-top: 1.25rem;">
            <h1 style="font-weight: bold; color: #1E40AF;">Account Details</h1>
          </div>
          <div>
            <p style="font-size: 30px; font-weight: bold;">Beneficiary: ${beneficiary}</p>
            <p style="font-size: 30px; font-weight: bold;">Description: ${descr.toUpperCase()}</p>
          </div>
        </div>
      </div>
    `;
    return html;
  };
  