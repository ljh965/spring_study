package com.sparta.week01.prac;

import java.util.ArrayList;
import java.util.List;

public class Prac {

    public static int countFruit(String fruit) {
        List<String> fruits = new ArrayList<>();
        fruits.add("감");
        fruits.add("배");
        fruits.add("감");
        fruits.add("딸기");
        fruits.add("수박");
        fruits.add("메론");
        fruits.add("수박");
        fruits.add("딸기");
        fruits.add("메론");
        fruits.add("수박");
        fruits.add("메론");
        fruits.add("수박");
        fruits.add("감");

        int cnt = 0;
        for(int i=0; i<fruits.size(); i++){
            if(fruits.get(i).equals(fruit)) {
                cnt++;
            }
        }
        return cnt;
    }

    public static void main(String[] args) {
        Course course = new Course();
        course.title = "웹개발의 봄, Spring";
        System.out.println(course.title);
        System.out.println(course.tutor);
    }
}
