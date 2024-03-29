﻿using Microsoft.EntityFrameworkCore;
using Promact.CustomerSuccess.Platform.Entities;
using System.Reflection.Metadata;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Promact.CustomerSuccess.Platform.Data;

public class PlatformDbContext : AbpDbContext<PlatformDbContext>
{
    public PlatformDbContext(DbContextOptions<PlatformDbContext> options)
        : base(options)
    {
    }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ClientFeedback> ClientFeedbacks { get; set; }
    public DbSet<ProjectResource> ProjectResources { get; set; }
    public DbSet<MeetingMinute> MeetingMinutes { get; set; }
    public DbSet<ApprovedTeam> ApprovedTeams { get; set; }
    public DbSet<ProjectUpdate> projectUpdates { get; set; }
    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<Phase> Phases { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own entities here */
        builder.Entity<MeetingMinute>(MeetingMinute =>
        {
            MeetingMinute.ToTable("meetingminute");
            MeetingMinute.ConfigureByConvention();
        });

        builder.Entity<Project>(Project =>
        {
            Project.ToTable("project");
            Project.ConfigureByConvention();
        });

        builder.Entity<ProjectResource>(ProjectResources =>
        {
            ProjectResources.ToTable("projectresource");
            ProjectResources.ConfigureByConvention();
        });

        builder.Entity<ClientFeedback>(ClientFeedback =>
        {
            ClientFeedback.ToTable("clientfeedback");
            ClientFeedback.ConfigureByConvention();
        });

        builder.Entity<ApplicationUser>(ApplicationUser =>
        {
            ApplicationUser.ToTable("applicationuser");
            ApplicationUser.ConfigureByConvention();
        });
        builder.Entity<ProjectUpdate>(ProjectUpdate =>
        {
            ProjectUpdate.ToTable("projectupdate");
            ProjectUpdate.ConfigureByConvention();
        });

        builder.Entity<ApprovedTeam>(ApprovedTeam =>
        {
            ApprovedTeam.ToTable("approvedteam");
            ApprovedTeam.ConfigureByConvention();
        });

        builder.Entity<Phase>(Phase =>
        {
            Phase.ToTable("phase");
            Phase.ConfigureByConvention();
        });

        builder.Entity<TodoItem>(b =>
        {
            b.ToTable("todoitems");
            b.ConfigureByConvention();
        });
        builder.Entity<Organization>(Organization =>
        {
            Organization.ToTable("organization");
            Organization.ConfigureByConvention();
        });
    }
}
