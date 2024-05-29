const Tablefunction=({datanew})=>{
    
    const data = 
        {
          configuration: {
            header: false,
            style: ['table', 'table-bordered', 'border-primary'],
          },
          head: ["username", "email", "name", "school"],
          body: [
            ["bosyem", "segzyyemi@gmail.com", "seun", "st paul"],
            ["bosyem", "segzyyemi@gmail.com", "desire", "st micheal"],
            ["bosyem", "segzyyemi@gmail.com", "yemi", "olokoju"],
          ],
        }
        const header=data.head
        const content=data.body
        return(
          <View>
            {
              header.map((item)=>{
                <View className="flex flex-row w-full justify-evenly">
                  {item}
                </View>

              })
          
            }
            {
              content.map((item)=>{
                <View className="flex flex-row w-full justify-evenly">
                  {item}
                </View>

              })
          
            }

            </View>
  
        )
      


}
export default Tablefunction