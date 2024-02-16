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
        router.refresh()
    }
    
    return(
        <div>
            <button onClick={itemRemove}>X</button>
        </div>
    )
}
export default RemoveItem;