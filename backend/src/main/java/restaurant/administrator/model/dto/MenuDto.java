package restaurant.administrator.model.dto;


import lombok.*;

import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuDto implements Serializable {

    @NotNull
    private String restaurant;

    @NotNull
    private List<Menu> appetizer;

    @NotNull
    private List<Menu> mainMeal;

    @NotNull
    private List<Menu> dessert;

    @NotNull
    private List<Menu> drinks;
}
