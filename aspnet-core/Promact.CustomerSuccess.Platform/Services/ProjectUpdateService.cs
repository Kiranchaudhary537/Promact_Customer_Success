using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Promact.CustomerSuccess.Platform.Service
{
    public class ProjectUpdateService : ApplicationService,
        IProjectUpdateService
    {
        IRepository<ProjectUpdate, Guid> _repository;
        public ProjectUpdateService(IRepository<ProjectUpdate, Guid> repository)
        {
            _repository = repository;
        }

      public  async Task<ProjectUpdate> CreateAsync(CreateProjectUpdateDto input)
        {
            Console.WriteLine(input);
            try
            {
                var entity = ObjectMapper.Map<CreateProjectUpdateDto, ProjectUpdate>(input);
                await _repository.InsertAsync(entity, autoSave: true);
                return entity;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }


        public async Task<List<ProjectUpdate>> GetAllAsync()
        {
            var entities = await _repository.GetListAsync();
            return entities;
        }

        public async  Task<ProjectUpdate> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            return entity;
        }

        public async Task<ProjectUpdate> UpdateAsync(Guid id, UpdateProjectUpdateDto input)
        {
            var entity = await _repository.GetAsync(id);
            ObjectMapper.Map(input, entity);
            await _repository.UpdateAsync(entity, autoSave: true);
            return entity;
        }
        public async Task<String> DeleteAsync(Guid id)
        {
            try
            {
                await _repository.DeleteAsync(id, autoSave: true);
                return "Success";
            }
            catch (Exception ex)
            {
                return "Failed" + ex.ToString();
            }

        }
    }
}
