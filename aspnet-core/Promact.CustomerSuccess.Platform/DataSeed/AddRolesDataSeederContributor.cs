using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.PermissionManagement;

namespace Promact.CustomerSuccess.Platform.DataSeed
{
    public class AddRolesDataSeederContributor: IDataSeedContributor, ITransientDependency
    {
    private readonly IRepository _userRepository;
    private readonly IRepository _roleRepository;
    private readonly IIdentityRoleAppService _identityAppService;
    private readonly IPermissionAppService _permissionAppService;
    private readonly IPermissionManager _permissionManager;

        public AddRolesDataSeederContributor(IRepository userRepository, IRepository roleRepository, IIdentityRoleAppService identityAppService, IPermissionAppService permissionAppService, IPermissionManager permissionManager)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _identityAppService = identityAppService;
            _permissionAppService = permissionAppService;
            _permissionManager = permissionManager;
        }

        public Task SeedAsync(DataSeedContext context)
        {
            throw new NotImplementedException();
        }
    }
}
