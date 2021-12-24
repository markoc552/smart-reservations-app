package restaurant.administrator.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.*;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private String manager;

    @NotNull
    private String openClosed;

    @NotNull
    private Integer availableTables;
}
