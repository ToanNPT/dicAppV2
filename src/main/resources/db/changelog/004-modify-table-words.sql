alter table words
drop column if exists voiceId;

alter table words
add column voice_url varchar(255);