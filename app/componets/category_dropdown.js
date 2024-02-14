const CatDetail = async() =>{

    function getCategory() {
      return fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria",{ cache: "no-store" }).then(
        (res) => res.json(),
      );
    }
    async function fetchData() {
      const data = await getCategory();
      return data;
    }
    const res = await fetchData();
    const data = res.data;
    
    console.log(data)
    return(
      <select>
        {/* {data?.map((item) => {
                return <options key={item.id} value={item.id}> {item.nazov}</options>;
              })} */}
      </select>
    )
    
      
    }
export default CatDetail