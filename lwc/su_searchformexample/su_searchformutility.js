import { LightningElement, api , wire , track} from 'lwc';

export default class Su_searchformexample extends LightningElement {
    
    searchFilterString = '';//Search Filter string

    // Handle the Resuable Search Custom Event
    fetchfilteredlist(event) {
        try{ 
            this.searchFilterString = this.generateSearchString(JSON.parse(event.detail));
            console.log('this.searchFilterString::'+this.searchFilterString);// This will finally give the dynamic where condition for the dynamic soql
        }catch(e){
            console.error(e.message);
            console.error(JSON.stringify(e.message));
        }
    }

    //Generate Resuable Search Where Condition
    generateSearchString(parsedArray){
        parsedArray.forEach((item) => {
            if (item.fieldValue != ''){
                if(this.searchFilterString != ''){
                    this.searchFilterString = this.searchFilterString + " and " + this.getFieldValueWithOperator(item);
                }else{
                    this.searchFilterString = this.getFieldValueWithOperator(item);
                }
            }
        });
        return this.searchFilterString;
    }
}