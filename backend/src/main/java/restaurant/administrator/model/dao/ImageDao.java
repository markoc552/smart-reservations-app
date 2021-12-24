package restaurant.administrator.model.dao;


import lombok.*;
import restaurant.administrator.util.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Entity
@Table(name = "images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String restaurant;

    @Lob
    @Column(name = "photo")
    private byte[] data;

    @NotNull
    private String owner;
}
