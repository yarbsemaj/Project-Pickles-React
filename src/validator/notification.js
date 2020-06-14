export default function(formData){
    if(!(formData.name && formData.name != "")){
        return "No name specified";
    }
    if(!formData.filters.length){
        return "No filters asigned";
    }

    let filterResponse = ""

    formData.filters.forEach(filter => {
        if(!("field" in filter && "filter" in filter && "value" in filter && filter.value != "") && filterResponse == ""){
            filterResponse += "Malformed Filter"
        }
    });
    if(filterResponse != ""){
        return filterResponse
    }
    return true
}