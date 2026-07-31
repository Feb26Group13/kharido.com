package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="seller_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sellerid")
	private Integer sellerId;

    @OneToOne
    @JoinColumn(name="userid")
    private User user;

    @Column(name="shop_name")
    private String shopName;

    @Column(name="gst_number")
    private String gstNumber;

    private String phone;

    @Column(name="approval_status")
    private String approvalStatus;

}
