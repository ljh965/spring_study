package com.example.homework01.prac;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String name;

    public Person(PersonRequestDto requestDto){
        this.age = requestDto.getAge();
        this.name = requestDto.getName();
    }

    public void update(PersonRequestDto requestDto){
        this.age = requestDto.getAge();
        this.name = requestDto.getName();
    }
}
