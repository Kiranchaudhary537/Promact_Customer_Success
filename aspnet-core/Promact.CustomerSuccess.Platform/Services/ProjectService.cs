﻿
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectService :
        ApplicationService,
        IProjectService
    {
        private readonly IRepository<Project, Guid> _projectRepository;
        public ProjectService(IRepository<Project, Guid> projectRepository) 
        {
            _projectRepository = projectRepository;
        }

        public async Task<List<Project>> GetProjectAsync()
        {
            var entities = await _projectRepository.GetListAsync();
            return entities;
        }

        public async Task<Project> GetProjectByIdAsync(Guid id)
        {
            var entity = await _projectRepository.GetAsync(id);
            return entity;
        }

        public async Task<Project> CreateProjectAsync(CreateProjectDto input)
        {
            var entity = ObjectMapper.Map<CreateProjectDto, Project>(input);
            await _projectRepository.InsertAsync(entity, autoSave: true);
            return entity;
        }

        public async Task<Project> UpdateProjectAsync(Guid id, UpdateProjectDto input)
        {
            var entity = await _projectRepository.GetAsync(id);
            ObjectMapper.Map(input, entity);
            await _projectRepository.UpdateAsync(entity, autoSave: true);
            return entity ;
        }

        public async Task<String> DeleteProjectAsync(Guid id)
        {
            try
            {
                await _projectRepository.DeleteAsync(id, autoSave: true);
                return "Success";
            }
            catch(Exception ex)
            {
                return "Failed" + ex.ToString();
            }
        }
    }
}
