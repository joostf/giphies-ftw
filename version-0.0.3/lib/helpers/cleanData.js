export default function cleanData (data) {
    if (Array.isArray(data)){
        return data.map(giphy => { 
            return {
                id: giphy.id, title: giphy.title
            } 
        })
    } else {
        return {
            id: data.id,
            title: data.title
        }
    }
}