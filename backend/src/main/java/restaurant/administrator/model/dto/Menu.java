package restaurant.administrator.model.dto;


import lombok.*;

import javax.validation.constraints.*;
import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Menu implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private String taste;

    @NotNull
    private String image;

    @NotNull
    private String description;
}
