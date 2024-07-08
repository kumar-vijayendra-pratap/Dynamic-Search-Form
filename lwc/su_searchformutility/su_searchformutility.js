import { LightningElement,api,track } from 'lwc';
import getMetadataRecords from '@salesforce/apex/SU_SearchFormUtilityController.getMetadataRecords';


export default class Su_searchformutility extends LightningElement {
    
    @api title;
    @track fields;
    @api feature;

    @track inputValues = {}; // Map to store input values

    @track metadataRecords = [];
    isDropdown;
    isText;

    connectedCallback(){
        getMetadataRecords({feature: this.feature})
        .then(result => {
            if (result) {
                this.fields = result;
                this.error = undefined;
                this.handleType(this.fields);
                
            }
        }) .catch(error => {
            console.log('error::'+error);
            this.error = error;
        });
    }
    
    handleType(fields) {
        fields.forEach(element => {
            element.isText = false;
            element.isDropdown = false;
            switch (element.SU_Type__c) {
                case 'Text':
                    element.isText = true;
                    break;
                case 'Dropdown':
                    element.isDropdown = true;
                    element.Options = this.getOptions(element.SU_Options__c.split(';'));
                    break;
            }
        });
        
    }

    getOptions(list){
        return list.map((item) => {
            return {
                label: item,
                value: item
            }
        });
    }

    reset(){
        // Use querySelector to select and clear the values of the fields
        const inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            inputField.value = '';
        });
        const comboboxFields = this.template.querySelectorAll('lightning-combobox');
        comboboxFields.forEach(comboboxField => {
            comboboxField.value = '';
        });
    }

    // Function to fetch and store input values in the map
    fetchInputValues() {
        const inputFields = this.template.querySelectorAll('lightning-input');
        inputFields.forEach(inputField => {
            this.inputValues[inputField.name] = inputField.value;
        });
        const comboboxFields = this.template.querySelectorAll('lightning-combobox');
        comboboxFields.forEach(comboboxFields => {
            this.inputValues[comboboxFields.name] = comboboxFields.value;
        });
    }

    gatherFieldData(metadataList) {
        const data = [];
        metadataList.forEach(metadata => {
            const fieldName = metadata.SU_Api_Name__c;
            const fieldLabel = metadata.SU_Label__c;
            const fieldType = metadata.SU_Type__c;
            const fieldRequired = metadata.SU_Required__c;
            const fieldOperator = metadata.SU_Operator__c;
            const fieldFeature = metadata.SU_Feature__c;
            let fieldValue = '';
    
            // Fetch field value based on the field type (e.g., text, dropdown)
            for (const field in this.inputValues) {
                if (fieldName == field) {
                    fieldValue = this.inputValues[field];
                }
            }
    
            data.push({
                fieldName,
                fieldLabel,
                fieldType,
                fieldRequired,
                fieldOperator,
                fieldValue,
                fieldFeature
            });
        });
    
        return JSON.stringify(data);
    }

    // Handle a button click to trigger fetching input values
    searchData(){
       try{
            this.fetchInputValues();
            // Now, this.inputValues contains the map of input name and value
            const jsonData = this.gatherFieldData(this.fields);
            
            //call the function to send the result to the parent
            const customEvent = new CustomEvent('searchfilterevent', {
                //detail: this.fields
                detail: jsonData // Pass the result data as detail
            });

            this.dispatchEvent(customEvent);
        }
        catch(e){
            console.error(e.message);
        }
    }

    handleInputChange(event) {
        // Handle input changes and update the corresponding property
        const { name, value } = event.target;
        this[name] = value;
    }
}