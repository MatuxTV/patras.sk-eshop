import directus from "@/lib/directus"
import { deleteItem } from "@directus/sdk";
import { useRouter } from 'next/navigation'

const RemoveItem =(props) => {

    const router = useRouter()
    
    const itemRemove = async() =>{

        {await directus.request(deleteItem(
            'objednavka',
             props.id 
        ))}
        {await directus.request(deleteItem(
            'skladanie_produkt',
             props.id_skladanie_objednavky 
        ))}
        router.refresh()
    }
    
    return(
        <div>
            <button onClick={itemRemove}>X</button>
        </div>
    )
}
export default RemoveItem;