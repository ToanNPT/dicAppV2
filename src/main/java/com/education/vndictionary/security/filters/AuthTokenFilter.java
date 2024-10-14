package com.education.vndictionary.security.filters;

import com.education.vndictionary.common.Jwt;
import com.education.vndictionary.services.impl.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private Jwt jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwtToken = this.parseJwt(request);
        if (jwtToken != null && jwtUtils.validateJwtToken(jwtToken)) {
            String jwtSubject = jwtUtils.getUserNameFromJwtToken(jwtToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(jwtSubject);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails,
                            userDetails.getPassword(),
                            userDetails.getAuthorities());

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        boolean isIgnore =  request.getRequestURI().startsWith("/api/auth")
                || request.getRequestURI().startsWith("/api/view")
                || request.getRequestURI().startsWith("/api/upload/file")
                || request.getRequestURI().startsWith("/uploads")
                || request.getRequestURI().startsWith("/swagger-ui");
        return isIgnore;
    }

    private String parseJwt(HttpServletRequest request) {
        var token = jwtUtils.getJwtFromCookies(request);
        return token;
    }
}
