import axios from 'axios';

export function savePaste(source, language) {

    if (source.length < 5000 && source !== '') {
         console.log(`Saving ${source} : ${language}`);

        return axios.post(API_URL+"/paste/create", {
            content: source,
            language: language
        }).then(value => {
            window.location.href = "/"+value.data.ID
        }).catch(reason => {
            console.error("Failed to save paste "+reason)
            alert("Saving paste failed.")
        })
    }



    alert("No content, or content > 5000 characters.")
}