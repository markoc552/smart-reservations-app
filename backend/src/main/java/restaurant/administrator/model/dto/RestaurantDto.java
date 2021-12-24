package restaurant.administrator.model.dto;


import lombok.*;

import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDto implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private List<String> images;

    @NotNull
    private String manager;

    private String openClosed;

    private Integer availableTables;

    private String mainImage;

}
