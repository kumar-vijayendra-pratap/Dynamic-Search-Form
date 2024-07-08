/**
 * @ File Name          : SU_SearchFormUtilityController.cls
 * @ Description        : This Apex class is a Controller for lwc : search form utility
 * @ Author             : Kumar Vijayendra
 * @ Group              : 
 * @ Modification Log   :
 * Ver          Date            Author                 	Modification
 * 1.0      08-07-2024      Kumar Vijayendra            Initial Version
**/
public without sharing class SU_SearchFormUtilityController {
    
    /**
     * @Desciption  : This method is to get the SU Search entitiy Metadata records as per Feature
     * @date        : 2023-10-26
     * @author      : Kumar Vijayendra (vijayendra.pratap@salesforce.com)
     * @Input       : String feature
     * @return      : List<SU_Search_Entity__mdt>
    */
    @AuraEnabled
    public static List<SU_Search_Entity__mdt> getMetadataRecords(String feature) {
        return [SELECT Id, SU_Label__c, SU_Api_Name__c, SU_Required__c, SU_Type__c, SU_Options__c, SU_Operator__c, SU_Order__c,SU_Feature__c  FROM SU_Search_Entity__mdt where SU_Feature__c =: feature and SU_Is_Active__c = true ORDER BY SU_Order__c asc];
    }
}