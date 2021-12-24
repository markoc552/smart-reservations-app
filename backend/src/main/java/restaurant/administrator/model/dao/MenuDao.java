package restaurant.administrator.model.dao;


import lombok.*;
import restaurant.administrator.model.dto.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;

@Entity
@Table(name = "menus")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String taste;

    @Lob
    @NotNull
    @Column(name = "image")
    private byte[] image;

    @NotNull
    private String description;

    @NotNull
    private String restaurant;

    @NotNull
    private String meal;
}
