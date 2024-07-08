/**
 * @ File Name          : SU_SearchFormUtilityControllerTest.cls
 * @ Description        : Apex Class for Test Class for SU_SearchFormUtilityController
 * @ Author             : Kumar Vijayendra
 * @ Group              : 
 * @ Modification Log   :
 * Ver          Date            Author                   Modification
 * 1.0      08-07-2024      Kumar Vijayendra            Initial Version
**/
@isTest
public class SU_SearchFormUtilityControllerTest {
    
    @isTest
    static void testGetMetadataRecords() {
        // Call the getMetadataRecords method
        List<SU_Search_Entity__mdt> result = SU_SearchFormUtilityController.getMetadataRecords('Search Feature');
        
        // Verify that the method returns the expected number of records
        System.assertNotEquals(0, result.size(), 'Expected Metadata Records');
    }
}
