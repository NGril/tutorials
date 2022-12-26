/// <reference types="cypress" />

import { onDatepickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with page objects', () => {
  
    beforeEach('open application', () => {
        cy.openHomePage('/');
    });

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datepickerPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
        navigateTo.toasterPage();
    });

    it('should submit inline and basic forms, select dates in the calendar and alter the smart table', () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail("Niko Gril", "test@test.com");
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword("test@test.com", "pass");
        
        navigateTo.datepickerPage();
        onDatepickerPage.selectCommonDatepickerDateForToday(1);
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);

        navigateTo.smartTablePage();
        onSmartTablePage.addNewRecordWithFirstAndLastName("Niko", "Gril");
        onSmartTablePage.updateAgeByFirstName("Niko", 25);
        onSmartTablePage.deleteRowByIndex(1);
    });

})