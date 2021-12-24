package restaurant.administrator.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;
import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Username is mandatory!")
    private String username;

    @NotNull(message = "Firstname is mandatory!")
    private String firstname;

    @NotNull(message = "Lastname is mandatory!")
    private String lastname;

    @NotNull(message = "Email is mandatory!")
    @Email(message = "Email is not properly formatted!")
    private String email;

    private String role;

    @OneToMany
    private List<RestaurantDao> enrolledProjects;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "credential_id", referencedColumnName = "id")
    private UserCredentialsDao credentials;

    public String toString() {
        return "UserDao{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
