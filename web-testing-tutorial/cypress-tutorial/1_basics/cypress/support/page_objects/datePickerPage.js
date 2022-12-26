// helper function for selecting the date
function selectDayFromCurrent(daysFromToday) {
  let date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  let futureDay = date.getDate();
  let futureMonth = date.toLocaleString("default", { month: "short" });
  let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        // here we are recursively calling this function, effectively calling a while loop
        selectDayFromCurrent(daysFromToday);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });

  return dateAssert;
}

export class DatepickerPage {
  selectCommonDatepickerDateForToday(daysFromToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssert = selectDayFromCurrent(daysFromToday);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert);
      });
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssertFirst = selectDayFromCurrent(firstDay);
        const dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = `${dateAssertFirst} - ${dateAssertSecond}`;
        cy.wrap(input).invoke("prop", "value").should("contain", finalDate);
        cy.wrap(input).should("have.value", finalDate);
      });
  }
}

export const onDatepickerPage = new DatepickerPage();
