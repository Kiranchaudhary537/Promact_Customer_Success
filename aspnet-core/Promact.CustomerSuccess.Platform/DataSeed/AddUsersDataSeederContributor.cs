using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;

namespace Promact.CustomerSuccess.Platform.DataSeed
{
    class AddUsersDataSeederContributor
        : IDataSeedContributor, ITransientDependency
    {
        private readonly IdentityUserManager _identityUserManager;

        public AddUsersDataSeederContributor(IdentityUserManager identityUserManager)
        {
            _identityUserManager = identityUserManager;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            // Add users
            IdentityUser identityUser1 = new IdentityUser(Guid.NewGuid(), "Dipa", "dipa@email.com");
            await _identityUserManager.CreateAsync(identityUser1, "@Dipa");
            await _identityUserManager.AddToRoleAsync(identityUser1, "Admin");

            IdentityUser identityUser2 = new IdentityUser(Guid.NewGuid(), "test_user2", "testuser2@email.com");
            await _identityUserManager.CreateAsync(identityUser2, "1q2w3E*");
            await _identityUserManager.AddToRoleAsync(identityUser2, "Admin");

            IdentityUser identityUser3 = new IdentityUser(Guid.NewGuid(), "test_user3", "testuser3@email.com");
            await _identityUserManager.CreateAsync(identityUser3, "1q2w3E*");
            //await _identityUserManager.AddToRoleAsync(identityUser3, "Admin");  // Intentionally not making this user and admin
        }
    }
}
