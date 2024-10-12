package com.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@RequiredArgsConstructor
public enum Permission implements GrantedAuthority {
    EVENT_READ("event:read"),
    EVENT_MODIFY("event:modify"),
    USER_READ("user:read"),
    USER_MODIFY("user:modify");

    @Getter
    private final String name;

    @Override
    public String getAuthority() {
        return name;
    }
}