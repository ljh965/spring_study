package com.sparta.week04.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
public class ProductRequestDto {
    private String title;
    private String image;
    private String link;
    private int lprice;
}
