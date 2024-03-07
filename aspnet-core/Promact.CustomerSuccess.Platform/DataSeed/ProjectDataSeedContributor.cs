using AutoMapper.Internal.Mappers;
using Promact.CustomerSuccess.Platform;
using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Guids;
using Volo.Abp.MultiTenancy;
using Volo.Abp.ObjectMapping;

namespace Promact.CustomerSuccess.Platform.DataSeed
{
    public class ProjectDataSeedContributor
        : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Project, Guid> _projectRepository;
        private readonly IRepository<Phase, Guid> _phaseRepository;
        private readonly IGuidGenerator _guidGenerator;
        private readonly ICurrentTenant _currentTenant;

        public ProjectDataSeedContributor(
            IRepository<Project, Guid> repository,
            IRepository<Phase, Guid> phaseRepository,
            IGuidGenerator guidGenerator,
            ICurrentTenant currentTenant)
        {
            _projectRepository = repository;
            _phaseRepository = phaseRepository;
            _guidGenerator = guidGenerator;
            _currentTenant = currentTenant;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            using (_currentTenant.Change(context?.TenantId))
            {
                if (await _projectRepository.GetCountAsync() > 0)
                {
                    return;
                }

                var projects = new List<Project>{
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Project Alpha",
                Description = "This is a sample project for demonstration purposes."
            },
            new Project
            {
                Id = Guid.NewGuid(),
                Name = "Project Beta",
                Description = "Another sample project for testing."
            }
        };

                // Add projects to the database
                foreach (var project in projects)
                {
                    //await context.Repository<Project>().InsertAsync(project);
                    await _projectRepository.InsertAsync(project);
                }

                //phases 
                var phases = new List<Phase>
        {
            new Phase
            {
                Title = "Phase 1 - Planning",
                StartDate = DateTime.Now,
                ProjectId = projects[0].Id
            },
            new Phase
            {
                Title = "Phase 2 - Development",
                StartDate = DateTime.Now.AddDays(7),
                ProjectId = projects[1].Id
            },

        };

                foreach (var phase in phases)
                {
                    await _phaseRepository.InsertAsync(phase);
                }

            }
        }

    }

}

