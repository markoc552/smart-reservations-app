package restaurant.administrator.model.dao;


import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
