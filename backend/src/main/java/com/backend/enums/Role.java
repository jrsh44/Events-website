package com.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN(
            Set.of(
                    Permission.EVENT_MODIFY,
                    Permission.EVENT_READ,
                    Permission.USER_MODIFY,
                    Permission.USER_READ
            )
    ),
    MANAGER(
            Set.of(
                    Permission.EVENT_MODIFY,
                    Permission.EVENT_READ
            )
    ),
    USER(
            Set.of(
                    Permission.EVENT_READ
            )
    );

    private final Set<Permission> permissions;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getAuthority()))
                .collect(Collectors.toList());
    }
}
