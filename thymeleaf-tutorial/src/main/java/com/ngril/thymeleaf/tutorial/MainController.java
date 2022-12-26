package com.ngril.thymeleaf.tutorial;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MainController {

    @GetMapping("/")
    public ModelAndView homePage() {
        Map<String, Object> model = new HashMap<>();

        model.put("username", "nikogril9");
        model.put("id", 13);

        return new ModelAndView("homepage", "model", model);
    }

    @GetMapping("profile")
    public ModelAndView viewProfile() {
        Map<String, Object> model = new HashMap<>();
        model.put("title", "Mr");
        model.put("firstName", "Niko");
        model.put("lastName", "Gril");
        model.put("dateOfBirth", LocalDate.of(1996, 2, 5));
        model.put("description", "A <strong>fantastic</strong> Java programmer.");

        List<String> languages = new ArrayList<>();
        languages.add("English");
        languages.add("French");
        languages.add("Spanish");
        languages.add("Italian");
        languages.add("German");

        model.put("languages", languages);

        return new ModelAndView("profile", "model", model);
    }

    @GetMapping("/addUser")
    public ModelAndView addUser() {
        return new ModelAndView("newUser", "addUserModel", new AddUserModel());
    }

    @PostMapping("/saveUser")
    public String saveUser(@Valid AddUserModel addUserModel, BindingResult bindingResult) {
        new AddUserModelValidator().validate(addUserModel, bindingResult);
        if(bindingResult.hasErrors()){
            return "newUser";
        }
        return "userAdded";
    }
}
