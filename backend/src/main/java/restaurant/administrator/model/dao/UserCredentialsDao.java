package restaurant.administrator.model.dao;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.*;

@Entity
@Table(name = "user_credentials")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCredentialsDao implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Username can't be null!")
    private String username;

    @NotNull(message = "Password can't be null!")
    private String password;

    @NotNull(message = "Role can't be null!")
    private String role;

    @OneToOne(mappedBy = "credentials", orphanRemoval = true, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private UserDao user;

    public String toString() {
        return "UserCredentialsDao{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
