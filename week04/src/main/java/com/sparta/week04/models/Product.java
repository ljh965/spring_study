package com.sparta.week04.models;


import com.sun.istack.Nullable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Product extends Timestamped{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private int lprice;

    @Column(nullable = false)
    private int myprice;

    public Product(ProductRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.image = requestDto.getImage();
        this.link = requestDto.getLink();
        this.lprice = requestDto.getLprice();
        this.myprice = 0;
    }

    public void updateProduct(ProductMypriceRequestDto requestDto){
        this.myprice = requestDto.getMyprice();
    }

    public void updateByItemDto(ItemDto itemDto){
        this.lprice = itemDto.getLprice();
    }
}
