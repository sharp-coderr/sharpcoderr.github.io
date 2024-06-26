﻿using System.ComponentModel.DataAnnotations;

namespace ChatApp.Server.DTOs.Account
{
    public record ResetPasswordDto
    {
        [Required, RegularExpression("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }

        public string NewPassword { get; set; }
    }
}
