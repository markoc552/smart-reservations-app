package restaurant.administrator.model.dto;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto implements Serializable {

    @NotNull
    private String lastname;

    @NotNull
    @JsonFormat(pattern = "YYYY-mm-DD")
    private Date date;

    @NotNull
    private String time;

    @NotNull
    private Integer people;

    @NotNull
    private String request;

    @NotNull
    private String restaurant;
}
