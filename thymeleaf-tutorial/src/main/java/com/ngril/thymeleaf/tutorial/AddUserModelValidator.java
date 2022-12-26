package com.ngril.thymeleaf.tutorial;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class AddUserModelValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return AddUserModel.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        AddUserModel addUserModel = (AddUserModel) o;
        if(!addUserModel.getPassword().equals(addUserModel.getRepeatPassword())){
            errors.rejectValue("repeatPassword", "PasswordsDontMatch");
        }
    }
}
